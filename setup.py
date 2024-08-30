from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in sal_rashed/__init__.py
from sal_rashed import __version__ as version

setup(
	name="sal_rashed",
	version=version,
	description="Sal Rashed",
	author="hamza",
	author_email="hamza@resourcefactors.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
