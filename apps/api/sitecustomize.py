from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


def _load_local_aioredis() -> None:
    root = Path(__file__).resolve().parent
    package_dir = root / "aioredis"
    init_path = package_dir / "__init__.py"
    if not init_path.exists():
        return

    spec = importlib.util.spec_from_file_location(
        "aioredis",
        init_path,
        submodule_search_locations=[str(package_dir)],
    )
    if spec is None or spec.loader is None:
        return

    module = importlib.util.module_from_spec(spec)
    sys.modules["aioredis"] = module
    spec.loader.exec_module(module)


_load_local_aioredis()
