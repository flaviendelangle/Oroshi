#!/bin/bash

app_title='Collection Manager'

echo Welcome on the $app_title installation procedure

# Check if Python is installed
if !(type "python" &> /dev/null)  ; then
    echo Unable to find your Python installation
    exit 1
fi

# Check if Pip is installed
if !(type "pip" &> /dev/null)  ; then
    echo Unable to find your Pip installation
    exit 1
fi

# Install Pipenv if needed
if !(type "pipenv" &> /dev/null)  ; then
    echo Installing Pipenv
    echo `pip install pipenv`
fi

# Install Python packages
echo Installing python packages
echo `pipenv install`


# Install NPM packages
echo Installing npm packages
echo `npm install --prefix ./app`

exit 1
