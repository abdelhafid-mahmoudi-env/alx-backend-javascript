#!/usr/bin/env python3
"""
Module for to_kv function
"""

from typing import Union, Tuple

def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Return a tuple with a string and the square of an int/float.

    Args:
        k (str): The string.
        v (Union[int, float]): The int or float to square.

    Returns:
        Tuple[str, float]: A tuple containing the string and the square of the int/float.
    """
    return (k, float(v ** 2))
