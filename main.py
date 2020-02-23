import numpy as np
import matplotlib.pyplot as plt

rows, cols = 9,9
board = np.zeros(rows*cols)

board[::2] = np.random.random(rows*cols //2+1)

board.reshape((rows,cols))

rowLabels = range(rows)
colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
plt.matshow(board)
plt.xticks(range(cols), colLabels)
plt.yticks(range(rows), rowLabels)
plt.show()