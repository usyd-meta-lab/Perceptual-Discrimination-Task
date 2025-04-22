# Perceptual Discrimination Task

This repository contains the code for the **Perceptual Discrimination Task**, an online psychology experiment developed using [jsPsych](https://www.jspsych.org/). In this study, participants judge which of two images contains more dots and then rate their confidence in their judgment. The experiment features practice and test phases, a dynamic staircase procedure for adjusting difficulty, and optional feedback based on participant performance.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Task Parameters](#task-parameters)
- [Installation & Usage](#installation--usage)
- [Code Structure](#code-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Overview

The experiment is implemented in HTML and JavaScript, using jsPsych v8.2.1 and several of its plugins for creating various trial types. The experiment includes the following components:

- **Instructions**: Introductory screens, practice trials with feedback, and test trials without feedback.
- **Stimuli**: Two boxes displayed on a canvas with a variable number of white dots.
- **Response Collection**: Participants respond using keyboard inputs (`W` or `E`).
- **Confidence Rating**: A slider response to rate confidence (enabled only during the Test phase).
- **Staircase Procedure**: An adaptive algorithm to adjust task difficulty based on participant accuracy.
- **Data Saving**: Experiment data is collected and then saved via a data pipe.

## Features

- **Adaptive Difficulty**: Uses a two-down one-up staircase method to dynamically adjust the difficulty.
- **Flexible Setup**: Task parameters can be easily modified through dedicated variables.
- **Responsive Feedback**: Visual feedback is provided on practice trials.
- **Participant Routing**: Redirects participants based on platform-specific conditions (SONA vs. Prolific).

## Task Parameters

The following table lists the key task parameters defined in the code:

| **Parameter**         | **Description**                                                                      | **Default Value / Example** |
|-----------------------|--------------------------------------------------------------------------------------|-----------------------------|
| `no_trials`           | Number of trials in each main block                                                  | 42                          |
| `no_practice_trials`  | Number of practice trials                                                            | 25                          |
| `total_blocks`        | Total number of blocks                                   | 5                           |
| `dots_diff`           | Starting difficulty (log-space), influencing the dot difference                      | 4.25                        |
| `in_fullscreen`       | Tracks whether participant is in fullscreen. Set to false to begin with             | `false`                      |
| `provide_feedback`    | Tracks feedback mode (`true` during practice, `false` during test blocks)            | _Undefined initially_       |
| `trialnum`            | Trial counter                                                                        | 1                           |
| `blocknum`            | Block counter                                                                        | 1                           |
| `aborted`             | Indicates whether the user was aborted from the experiment                           | `false`                     |
| `phase`               | Tracks current phase: `"Practice"` or `"Test"`                                       | `null`                      |

## Installation & Usage

1. **Download the Repository:**

2. **Host Files:**
   You can host the experiment on any web server (e.g., GitHub Pages, Apache, or a Node.js server). For GitHub Pages, push your repository to GitHub and enable GitHub Pages in the repository settings.

3. **Open the Experiment:**
   Navigate to the URL where your files are hosted (e.g., `https://yourusername.github.io/dot-discrimination/`) to start the experiment.

4. **External Dependencies:**
   Make sure the external scripts (such as [jsPsych](https://www.jspsych.org/) and its plugins) load correctly. This setup assumes an active internet connection.

## Code Structure

The repository is structured as follows:

```
usyd-meta-lab/
│
├── index.html              # Main HTML file containing experiment code.
├── custom-css.css          # Custom CSS to style the experiment.
├── info_sheets.js          # Contains participant information screens and other variables [loaded externally so most recent documents are used].
├── README.md               # This README file.
└── ...                     # (Additional assets, e.g., images, may be included)
```

- **index.html:**  
  Contains the entire experiment script including initialization, instructions, task procedure, and data saving routines.

- **info_sheets.js:**  
  Contains external variables and functions for handling participant info and debrief screens, and any other details required by the experiment. It is loaded externally from http://usyd-meta-lab.github.io/files so the most recent documents are automatically used.

## Dependencies

- [jsPsych](https://www.jspsych.org/) (v8.2.1)
- [jQuery](https://jquery.com/) (v2.1.3)
- [Foundation](https://foundation.zurb.com/) (v5.5.2)
- Various jsPsych plugins:
  - [Plugin Instructions](https://www.jspsych.org/)
  - [Plugin HTML Keyboard Response](https://www.jspsych.org/)
  - [Plugin HTML Button Response](https://www.jspsych.org/)
  - [Plugin Survey Text](https://www.jspsych.org/)
  - [Plugin External HTML](https://www.jspsych.org/)
  - [Plugin Preload](https://www.jspsych.org/)
  - [Plugin HTML Slider Response](https://www.jspsych.org/)
  - [Plugin Browser Check](https://www.jspsych.org/)
  - [Plugin Canvas Keyboard Response](https://www.jspsych.org/)
  - [Plugin Call Function](https://www.jspsych.org/)
  - [Plugin Fullscreen](https://www.jspsych.org/)
  - [Plugin Survey HTML Form](https://www.jspsych.org/)
  - [Plugin Survey Likert](https://www.jspsych.org/)
  - [jsPsych-Contrib Pipe](https://www.jspsych.org/)

Please check the project’s HTML file for the most current dependency versions and URLs.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute as per the license terms.

