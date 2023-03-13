# Get current script file directory
DIR=$(dirname "$(realpath $0)")
echo "Running blog generator script from $DIR"

# Source python virtual environment
VENV_PATH=$DIR/.venv
if [ ! -d "$VENV_PATH" ]; then
    echo "Creating python virtual environment"
    python3 -m venv $VENV_PATH
    $VENV_PATH/bin/pip install -r $DIR/requirements.txt
fi

. $VENV_PATH/bin/activate
echo "Using python virtual environment: $(which python)"

# Run python script
echo "Running blog generator script"
OUT_PATH=$DIR/../content/blog python $DIR/blog-generator.py