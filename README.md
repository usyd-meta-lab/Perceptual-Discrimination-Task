

# README: Perceptual Decision Making  Task

## Overview
This repository contains a jsPsych experiment that asks participants to discriminate which of two boxes contains more dots (left or right). After making a choice, they are asked to rate their confidence in that decision. The experiment supports data collection from various recruitment sources (e.g., Prolific, SONA) and can be configured to save data via jsPsychPipe to a remote server or local storage.

## File Structure
```
.
├── index.html                # Main experiment file containing the jsPsych setup
├── custom-css.css           # Custom CSS for styling
├── README.md                # Explanation of parameters & usage
└── ...
```
*Additional jsPsych plugin scripts are loaded via CDNs.*

## Setup & Requirements
- **Browser**: The code checks that participants are using Chrome or Firefox on desktop for best compatibility.
- **Screen**: The experiment is designed to be run in **fullscreen mode**, which is enforced before the main trials begin.
- **Libraries**: jsPsych (v8.x.x) and the relevant plugin scripts are included by CDN in `index.html`. No manual installation is required if you have internet access.

## Key Experiment Parameters
Many of these parameters are found in the `index.html` script. Below is a reference guide:

### Data & Redirects
- **DataPipe_ID** (default: `"vUyxuIvNMDjb"`)  
  - Unique identifier for saving data via jsPsychPipe. Replace with your own if you have a separate DataPipe instance.
- **sona_experiment_id** (default: `"NA"`)  
  - Numerical ID for the experiment on SONA (if recruiting from SONA).
- **sona_credit_token** (default: `"NA"`)  
  - The unique credit token associated with your SONA experiment.
- **Prolific_redirect** (default: `"CHGWKNI0"`)  
  - Completion code for Prolific participants (appended to the Prolific redirect link).
- **Prolific_failed_check** (default: `"C13PIUOF"`)  
  - Alternative completion code for participants who fail an attention check.
- **redirect_link** / **attention_redirect_link**  
  - Constructed at runtime depending on whether the participant arrived via Prolific or SONA.  
  - If participants meet performance criteria (e.g., a minimum accuracy), they are redirected to `redirect_link`. Otherwise, they are redirected to `attention_redirect_link`.

### Timing & Trial Parameters
- **task_time** (default: `30`)  
  - The nominal time in minutes for which the Participant Information Sheet (PIS) says the task will take. This is for instructions only (no actual timer used).
- **no_practice_trials** (default: `25`)  
  - Number of trials in the *practice* block.
- **no_trials** (default: `42`)  
  - Number of trials in each *test* block.
- **total_blocks** (default: `5`)  
  - Number of main (test) blocks. A short break is offered before each new block.

### Staircase & Difficulty
- **dots_diff** (default: `4.25`)  
  - In log-space (log(4.25) ~ 1.44 means an initial difference of ~70 dots).  


### Phase Tracking & Bookkeeping
- **phase**  
  - Internal variable in the code: `"Practice"` or `"Test"`. Used for data labeling.
- **trialnum**, **blocknum**  
  - Counters incremented after each trial/block, useful for saving trial-by-trial data.

### Additional Variables from External Scripts
- **participant_info_paid**, **participant_info_SONA**, **demographics**  
  - Trials that capture participant info, consent, or demographic details (defined in `info_sheets.js` which is read in from the lab website automatically).  
  - Customize these if your ethics requires different info.
- **DEBRIEF_SONA**  
  - Debrief screen for SONA participants (also in `info_sheets.js`).

## How to Run Locally
1. **Download / Clone** this repository.
2. **Open** `index.html` in a Chrome or Firefox browser. (Local file or via a simple local web server.)
3. The experiment should launch; you’ll see the participant information pages, instructions, practice block, etc.

## How to Deploy Online
- You can **upload** these files to a web server (e.g., GitHub Pages, your lab’s server, or a hosting service).
- Provide participants with the link (e.g., `https://mysite.org/index.html?SONAID=12345` or `?PROLIFIC_PID=ABCDE`), so that SONA or Prolific IDs are captured in the query parameters.
- Data will be saved via **jsPsychPipe** if the `DataPipe_ID` and the remote server are configured properly. Check that your server allows calls from your domain.

## Data Storage & Export
- **jsPsychPipe**: The experiment includes a final trial that calls the plugin `jsPsychPipe` to upload data (in `.csv` format) to the location identified by `DataPipe_ID`.
- For local debugging, you can temporarily enable `jsPsych.data.get().localSave('csv','mydata.csv');` in the `on_finish` callback to save a CSV locally (commented out in the code).

## Common Customizations
- **Confidence Scale Labels**: The default 6-point scale is labeled from `"Guessing"` to `"Certain"`. Edit these labels in the `conf_instruc` and `dot_trial` confidence rating sections.

## Troubleshooting
- **Not Saving Data**: Ensure your `DataPipe_ID` is correct and the server supports cross-origin requests.  
- **Browser Restriction**: If participants keep getting blocked, check that `jsPsychBrowserCheck` includes the correct logic for accepted browsers/devices.  
- **Fullscreen**: Some participants on older operating systems might not have a reliable fullscreen API; you can disable the fullscreen check by editing the `enter_fullscreen` timeline.

## References
- **Maniscalco, B., & Lau, H. (2014).** Signal detection theory analysis of type 1 and type 2 data: meta-d’, response-specific meta-d’, and the unequal variance SDT model. *The Cognitive Neuroscience of Metacognition* (pp. 25–66). Springer.
- <a href="https://doi.org/10.1016/j.biopsych.2017.12.017"> Roualt et al. (2018).**Psychiatric Symptom Dimensions Are Associated With Dissociable Shifts in Metacognition but Not Task Performance**. *Biological Psychiatry*. 
- **jsPsych documentation**: <https://www.jspsych.org>
- **jsPsychPipe**: <https://github.com/brown-ccv/jsPsychPipe>
- **Staircase Procedure**: Adjusted within `dot-difference-functions.js`.

---

