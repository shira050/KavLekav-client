
# React JS and .NET Core Image to Line-by-Line Game Algorithm

## Project Overview

This project involves creating an interactive web application using React JS and .NET Core. The application transforms a single-object image into a line-by-line game. Users can define the type of jumps between points, enabling experiential learning through the site. Users can explore sequences such as A-B, computer science series, and engineering sequences, all according to their preferences.
![image](https://github.com/shira050/KavLekav-client/assets/98688678/d100f97e-94f4-46ad-ad8f-52bb862b305b)
![image](https://github.com/shira050/KavLekav-client/assets/98688678/9c4940ba-d0a6-4e1c-91de-1319d29f4348)

## Features

- **Image Processing**: Convert images to line-based representations.
- **Custom Jumps**: Allow users to define point-to-point jumps.
- **Educational Content**: Facilitate learning through interactive sequences.
- **Algorithm Visualization**: Illustrate algorithms used for point detection and boundary recognition.
- **User Management**: Admin users can manage the system, and every user can see the pictures they have created.

## Algorithms

### 1. Moravec's Algorithm for Interest Point Detection

Moravec's algorithm identifies points of interest in an image, which are not necessarily within the frame.

#### Steps:
1. **Identify Points**: Detect points that are significant based on their surroundings.
2. **Algorithm Process**: For each pixel, iterate over its neighbors and calculate the variance for each.
3. **Variance Map**: Generate a map based on the calculated variances.

### 2. Boundary and Perimeter Point Detection

This algorithm detects boundary points and the perimeter of the object in the image.

#### Steps:
1. **First Black Pixel**: Find the first black pixel.
2. **Neighbor Search**: For each neighbor, search for a black neighbor and recursively continue the search for \( n-1 \) from the previously found neighbor.

### Example

Include illustrative images and examples demonstrating the algorithm:

1. **Original Image**:
   ![Original Image](path/to/original_image.png)

2. **Interest Points Detected**:
   ![Interest Points](path/to/interest_points.png)

3. **Boundary Detection**:
   ![Boundary Detection](path/to/boundary_detection.png)

## Client-Side (React JS)

### User Management

#### Admin Users
Admin users have access to manage all aspects of the application, including user management, image approvals, and system settings.

#### Regular Users
Regular users can upload images, apply algorithms, and view the images they have created.

### User Interface

#### Home Page
- Displays general information about the application.
- Provides login and registration options.

#### Dashboard
- Accessible after logging in.
- Admin users have additional controls for managing the system.
- Regular users see options for uploading images and viewing their creations.

#### Image Upload
- Users can upload images.
- Users can apply algorithms to their images to generate line-by-line games.

#### My Creations
- Users can view a list of all images they have uploaded and processed.
- Each image can be clicked to view detailed information and interact with it.

## Setting Up the Project

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo.git
    cd your-repo
    ```

2. **Backend Setup (.NET Core)**:
    - Ensure you have .NET Core SDK installed.
    - Navigate to the backend project folder and run:
      ```bash
      dotnet restore
      dotnet build
      dotnet run
      ```

3. **Frontend Setup (React JS)**:
    - Ensure you have Node.js and npm installed.
    - Navigate to the frontend project folder and run:
      ```bash
      npm install
      npm start
      ```

4. **Access the Application**:
    - Open your browser and go to `http://localhost:3000` to access the frontend.
    - The backend should be running on `http://localhost:5000` by default.

## Contributions

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README file now includes details about the client-side management for both admin and regular users, outlining how each user can interact with the application and manage their own content. Feel free to further customize this to suit your project's specific requirements.
