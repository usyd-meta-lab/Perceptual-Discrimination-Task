% Import CSV file into MATLAB
data = readtable('participant-data.csv');

% Access data
stimID = data.stimID;
response = data.response;
rating = data.rating;
ID = data{1, "participant_id"};

% Count Data
[nR_S1, nR_S2] = trials2counts(stimID, response, rating, 6,1);

% meta-d
result = fit_meta_d_MLE(nR_S1, nR_S2);
disp(result);

% Save numerical array to CSV
meta_data = [ID, result.da, result.meta_da];

% Define column headers
headers = {'participant_id', 'da', 'meta_da'};
combined_data = [headers; meta_data];

% Write
writecell(combined_data, 'results.csv');
