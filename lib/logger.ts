/* Small leveled logger with ANSI colors for server logs.
   No dependency: Node has no built-in leveled logger, but colors + levels
   are a few lines. Honors LOG_LEVEL (debug|info|warn|error), default "info".
   Colors auto-disable when stdout is not a TTY (CI, piped logs) or NO_COLOR
   is set, so log files stay clean. */

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 } as const;
type Level = keyof typeof LEVELS;

const envLevel = (process.env.LOG_LEVEL || "info").toLowerCase() as Level;
const threshold = LEVELS[envLevel] ?? LEVELS.info;

const useColor =
  !process.env.NO_COLOR && (process.stdout?.isTTY ?? false);

const COLORS: Record<Level, string> = {
  debug: "\x1b[90m", // grey
  info: "\x1b[36m", // cyan
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
};
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function paint(level: Level, label: string): string {
  return useColor ? `${BOLD}${COLORS[level]}${label}${RESET}` : label;
}

function emit(level: Level, msg: string, meta?: unknown) {
  if (LEVELS[level] < threshold) return;
  const ts = new Date().toISOString();
  const tag = paint(level, level.toUpperCase().padEnd(5));
  const line = `${useColor ? "\x1b[90m" : ""}${ts}${useColor ? RESET : ""} ${tag} ${msg}`;
  const sink = level === "error" || level === "warn" ? console.error : console.log;
  if (meta !== undefined) {
    sink(line, meta);
  } else {
    sink(line);
  }
}

export const log = {
  debug: (msg: string, meta?: unknown) => emit("debug", msg, meta),
  info: (msg: string, meta?: unknown) => emit("info", msg, meta),
  warn: (msg: string, meta?: unknown) => emit("warn", msg, meta),
  error: (msg: string, meta?: unknown) => emit("error", msg, meta),
};

// ponytail: single flat logger. Add child/scoped loggers only if a real need
// for per-module prefixes shows up.
