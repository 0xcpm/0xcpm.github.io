import numpy as np
import matplotlib.pyplot as plt
import imageio

def create_plumbob():
    """Generate the vertices of a plumbob shape."""
    return np.array([[0, 1], [0.5, 0], [0, -1], [-0.5, 0]])

def plot_shape(ax, shape, central_edge, color='#073642'):
    """Plot the shape with only an outlined edge."""
    shape = np.vstack([shape, shape[0]])  # Close the shape by repeating the first point
    ax.plot(shape[:, 0], shape[:, 1], color=color, linewidth=2)  # Draw only the edge

    # Plot the central edge
    ax.plot(central_edge[:, 0], central_edge[:, 1], color=color, linewidth=2)

# Parameters
frames = 200  # Number of frames for the animation
swing_amplitude = 0.1  # Amplitude of the swing
swing_speed = 5  # Speed multiplier for faster swinging
rotation_speed = 50 * np.pi / frames  # Rotation speed

# Create a list to store the images
images = []

# Create the plumbob shape and central edge
plumbob_shape = create_plumbob()
central_edge = np.array([[0, 1], [0, -1]])  # Central line from top to bottom

# Generate frames with swinging motion
for frame in range(frames):
    fig, ax = plt.subplots()
    ax.set_aspect('equal')
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)

    # Set background color to #Fdf6e3 (light off-white)
    fig.patch.set_facecolor('#000000')
    ax.set_facecolor('#000000')

    # Calculate the swinging angle with a higher speed
    angle = swing_amplitude * np.sin(swing_speed * frame * 2 * np.pi / frames)

    # Apply rotation to the plumbob shape and central edge
    rotation_matrix = np.array([[np.cos(angle), -np.sin(angle)], [np.sin(angle), np.cos(angle)]])
    rotated_plumbob = np.dot(plumbob_shape, rotation_matrix)
    rotated_central_edge = np.dot(central_edge, rotation_matrix)

    # Plot the plumbob shape and the central edge with only the edge in color #ffffff
    plot_shape(ax, rotated_plumbob, rotated_central_edge, color='#ffffff')

    # Turn off the axes
    ax.set_axis_off()

    # Save the frame
    fig.canvas.draw()
    image = np.frombuffer(fig.canvas.tostring_rgb(), dtype='uint8')
    image = image.reshape(fig.canvas.get_width_height()[::-1] + (3,))
    images.append(image)

    plt.close()

# Save the frames as a GIF
imageio.mimsave('eth_inverted_colors.gif', images, fps=10)
