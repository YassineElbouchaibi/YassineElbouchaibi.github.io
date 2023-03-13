# Get current script file directory
DIR=$(dirname "$(realpath $0)")
echo "Running blog generator script from $DIR"

# Source python virtual environment
. $DIR/.venv/bin/activate
echo "Using python virtual environment: $(which python)"

# Run python script
echo "Running blog generator script"
OUT_PATH=$DIR/../content/blog python $DIR/blog-generator.py