import subprocess
import tempfile
import time
import os


def run_python_code(code, input_data):
    """
    Executes Python code safely in a temporary file.
    Returns output, error, and execution time.
    """

    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".py", mode="w") as temp:
            temp.write(code)
            temp_filename = temp.name

        start_time = time.time()

        # Run the code
        process = subprocess.run(
            ["python", temp_filename],
            input=input_data,
            text=True,
            capture_output=True,
            timeout=5
        )

        end_time = time.time()

        # Clean up file
        os.remove(temp_filename)

        return {
            "output": process.stdout.strip(),
            "error": process.stderr.strip(),
            "execution_time": end_time - start_time
        }

    except subprocess.TimeoutExpired:

        return {
            "output": "",
            "error": "Time Limit Exceeded",
            "execution_time": 5
        }

    except Exception as e:

        return {
            "output": "",
            "error": str(e),
            "execution_time": 0
        }