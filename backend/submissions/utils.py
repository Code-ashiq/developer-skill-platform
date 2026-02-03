import subprocess
import time

def run_python_code(code, input_data):
    try:
        start = time.time()

        process = subprocess.run(
            ["python", "-c", code],
            input=input_data,
            text=True,
            capture_output=True,
            timeout=5
        )

        end = time.time()

        return {
            "output": process.stdout.strip(),
            "error": process.stderr.strip(),
            "time": end - start
        }

    except subprocess.TimeoutExpired:
        return {"output": "", "error": "Time Limit Exceeded", "time": 5}