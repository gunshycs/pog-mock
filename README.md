<div align="center">
    <img width="1916" height="912" alt="image" src="https://github.com/user-attachments/assets/e42702fa-b344-47c2-b51e-17f2cf356ec7" />

    <h1>Pog Mock</h1>
    <a href="#">
        <img alt="Live Demo" src="https://img.shields.io/badge/demo-online-green.svg">
    </a>
    <img alt="React" src="https://img.shields.io/badge/React-18-blue?style=flat&logo=react&logoColor=white">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white">
    <img alt="html2canvas" src="https://img.shields.io/badge/html2canvas-FF6A00?style=flat&logo=html5&logoColor=white">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg">
    <a href="https://opensource.org/licenses/MIT">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
    </a>
</div>

# Pog Mock

A dynamic planogram (POG) mock application built with **React** and **TypeScript**. Click on cells to view product details, report POG issues, and download screenshots highlighting selected items.  

---

## Homepage
![Planogram](./assets/planogram.png)
*Main planogram grid with clickable cells.*

## Overlay View
![Overlay](./assets/overlay.png)
*Overlay showing clicked product with POG Issue button.*

## POG Issue Screenshot
![Bounding Box](./assets/bounding-box.png)
*Screenshot captured with red bounding box around selected cell.*

---

Pog Mock allows users to interact with a visual planogram of products. Clicking a cell opens an overlay, showing product details, and users can report a POG issue by taking a screenshot of the planogram with the selected cell highlighted.

---

## Table of Contents

1. [Overview](#-overview)  
2. [Features](#features)  
3. [Setup & Installation](#-setup--installation)  
4. [License](#-license)  

---

## 🌟 Overview

Pog Mock is designed to help visualize product layouts in a planogram. Its features include a dynamic grid of cells, clickable product images, and a POG Issue reporting system that allows for capturing screenshots with highlighted items.  

---

## Features

### Dynamic Planogram Grid
- Configurable rows and columns.
- Cells can display product images or identifiers.

### Overlay Details
- Click on a cell to open an overlay showing product details.
- Overlay includes the clicked product image and POG Issue button.

### POG Issue Reporting
- Capture a screenshot of the planogram (without overlay).
- Draw a red bounding box around the selected item.
- Download the screenshot for reporting.

### Responsive Design
- Layout adapts to screen size and planogram dimensions.

---

## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pog-mock.git
cd pog-mock

# Install dependencies
npm install

# Start development server
npm start
