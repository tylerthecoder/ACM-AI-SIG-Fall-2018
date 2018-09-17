import tensorflow as tf
from tensorflow import keras
#import numpy as np

# Get test and training data
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# normalize pixel values
train_images = train_images / 255.0
test_images = test_images / 255.0

# create model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(100, activation=tf.nn.elu),
    keras.layers.Dense(10, activation=tf.nn.softmax) # softmax creates values (0,1) that sum to 1
])

# compile model
model.compile(optimizer=tf.train.AdamOptimizer(),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# train model
model.fit(train_images, train_labels, epochs=5)

# test model
test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_acc}')
