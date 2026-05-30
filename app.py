from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')

@app.route('/sudoku')
def sudoku():
    return render_template('sudoku.html')

@app.route('/memory')
def memory():
    return render_template('memory.html')

if __name__ == '__main__':
    app.run(debug=True)