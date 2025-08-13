from src.config import env

import logging
from logging.config import dictConfig


def get_formatters() -> tuple[str, dict[str, dict]]:
    if env.COLORLOG_AVAILABLE:
        formatter_name = "color"
        formatters = {
            "color": {
                "()": "colorlog.ColoredFormatter",
                "format": "%(log_color)s%(asctime)s - %(levelname)s in %(module)s: %(message)s",
                "log_colors": {
                    "DEBUG": "cyan",
                    "INFO": "green",
                    "WARNING": "yellow",
                    "ERROR": "red",
                    "CRITICAL": "bold_red",
                },
            },
            "default": {
                "format": "%(asctime)s - %(levelname)s in %(module)s: %(message)s",
            },
        }
    else:
        formatter_name = "default"
        formatters = {
            "default": {
                "format": "%(asctime)s - %(levelname)s in %(module)s: %(message)s",
            },
        }

    return formatter_name, formatters


formatter_name, formatters = get_formatters()

logging_config = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": formatters,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": formatter_name,
        },
    },
    "root": {
        "level": "INFO",
        "handlers": ["console"],
    },
    "loggers": {
        "uvicorn.access": {
            "level": "INFO",
            "handlers": ["console"],
            "propagate": False,
        },
        "app": {
            "level": "INFO",
            "handlers": ["console"],
            "propagate": False,
        },
        "log_node": {
            "level": env.LOGGING_LEVEL.upper(),
            "handlers": ["console"],
            "propagate": False,
        },
    },
}


def setup_logging():
    dictConfig(logging_config)
    logging.getLogger("app").info("Logging configurado com sucesso!")
