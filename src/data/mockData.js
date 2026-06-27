export const MOCK_QUESTIONS = [
  {
    id: 1,
    text: 'In the context of Support Vector Machines (SVM), what is the primary purpose of the "kernel trick"?',
    code: `def svm_objective(w, b, x, y, C):
    # What role does the kernel play here if applied?
    margin = y * (np.dot(x, w) + b)
    loss = np.maximum(0, 1 - margin)
    return 0.5 * np.dot(w, w) + C * np.sum(loss)`,
    options: [
      'To reduce the dimensionality of the feature space, thereby speeding up training times significantly.',
      'To allow the SVM to learn non-linear decision boundaries by implicitly mapping input features into a higher-dimensional space.',
      'To automatically tune the hyperparameters C and γ during the optimization process.',
      'To convert a classification problem into a regression problem by smoothing the hinge loss function.',
    ],
  },
  {
    id: 2,
    text: 'Which of the following activation functions is most prone to the "dying" problem during backpropagation?',
    code: null,
    options: [
      'Sigmoid',
      'Tanh',
      'ReLU (Rectified Linear Unit)',
      'Leaky ReLU',
    ],
  },
  {
    id: 3,
    text: 'What is the primary function of the learning rate in gradient descent?',
    code: null,
    options: [
      'It determines the size of the steps taken to reach the minimum of the loss function.',
      'It sets the maximum number of iterations the algorithm will perform.',
      'It controls the number of hidden layers in a neural network.',
      'It initializes the weights of the model.',
    ],
  },
];

// Fill up to 40 questions for the navigation grid demo
for (let i = 4; i <= 40; i++) {
  MOCK_QUESTIONS.push({
    id: i,
    text: `Mock Question ${i} for demonstration purposes.`,
    code: null,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  });
}
