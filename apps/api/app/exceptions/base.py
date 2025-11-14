from __future__ import annotations

class ServiceError(Exception):
    def __init__(self, message: str, *, status_code: int = 400) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class NotFoundError(ServiceError):
    def __init__(self, message: str = "Not found") -> None:
        super().__init__(message, status_code=404)

class ConflictError(ServiceError):
    def __init__(self, message: str = "Conflict") -> None:
        super().__init__(message, status_code=409)
