# Legal Case Tracker

## Overview

The Legal Case Tracker is an advanced full-stack application designed to streamline the process of managing legal cases. It provides a robust platform for users to track different legal cases, update their status, and leverage AI-powered text analysis to extract key points from case descriptions. This application demonstrates complex software solutions, architectural design, and the seamless integration of Node.js and Vue.js frameworks.

## Features

### Backend

- **Node.js/Express**: Serves as the backbone of the application, handling REST API endpoints for CRUD operations on case data.
- **MongoDB**: A NoSQL database used to store and retrieve case data efficiently.
- **Real-time Updates**: Utilizes Socket.IO for real-time bidirectional event-based communication.

### Frontend

- **Vue.js Dashboard**: A dynamic and responsive dashboard that displays all cases, with functionalities to add, edit, and view cases in detail.
- **Vue Router**: Utilizes Vue Router for seamless and accessible navigation throughout the application.
- **Real-time Notifications**: Implements Socket.IO client to receive and display real-time updates on case status.

### Extra Features

- **Advanced UI/UX**: Employs Vuetify for a sophisticated material design interface, demonstrating a commitment to high-quality frontend development.
- **AI-Powered Summarization**: Integrates OpenAI's ChatGPT to automatically generate concise summaries for case descriptions.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB
- Vue CLI
- Socket.IO
- OpenAI API (for ChatGPT integration)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/legal-case-tracker.git
```
