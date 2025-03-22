# Open Source Learning Management System

A community-driven, feature-rich Learning Management System (LMS) designed to empower educators and learners. This open-source platform is flexible, secure, and customizable to meet diverse educational needs.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Community](#community)
- [License](#license)

## Features
- **Course Management**: Create, organize, and deliver engaging courses with an intuitive content management system.
- **Student Engagement**: Foster collaboration through discussion forums, live sessions, and interactive assignments.
- **Analytics & Insights**: Track student progress and course effectiveness with comprehensive analytics tools.
- **Secure & Private**: Protect user data and student privacy with a security-first approach.
- **Customizable**: Tailor the platform to fit your specific educational needs.

## Technology Stack
This project utilizes a monorepo structure with the following technologies:
- **Backend**: [NestJS](https://nestjs.com/) for the LMS API
- **Frontend**: [Next.js](https://nextjs.org/) for the LMS client and documentation site
- **Documentation**: [Nextra](https://nextra.vercel.app/) for easy documentation management
- **Package Manager**: [pnpm](https://pnpm.js.org/) for efficient dependency management

## Getting Started
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tracepanic/learn-sphere.git
   cd lms
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Build the project**:
   ```bash
   pnpm turbo build
   ```
4. **Configure your environment**:
   - Create a `.env` file in the root directory and set your environment variables.
   - Adjust LMS settings as needed.

## Deployment
To deploy the backend and client:
- Ensure your environment variables are correctly set in the `.env` file.
- Follow the specific deployment instructions for your hosting provider.
- You may need to deploy the backend and client separately.

## Usage
After deployment, you can access the LMS through your web browser. The default URL will depend on your hosting setup.

### Accessing the API
The API documentation can be found in the [API Documentation](#api-documentation) section below.

## API Documentation
The API is built with REST principles.

For detailed API documentation, please refer to the [API Documentation](#api-documentation) (link to be added).

## Contributing
We welcome contributions! Please read our **Contributing Guidelines** for details on how to get involved.

### How to Contribute
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Create a pull request to the main repository.

## Community
Join our community to share ideas, ask questions, and collaborate with others:
- **Discussion Forum** ()
- **Chat on Discord** ()

## License
This project is licensed under the **AGPL-3.0 License**. See the [LICENSE](LICENSE) file for details.

Thank you for your interest in our Open Source Learning Management System! Together, we can enhance the educational experience for everyone.
