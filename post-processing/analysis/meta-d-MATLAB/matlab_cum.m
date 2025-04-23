% Import CSV file into MATLAB
data = readtable('participant-data.csv');

% Get unique participant IDs (as a cell array of strings)
uniqueIDs = unique(data.participant_id);

% Initialize cell array to store results for all participants
all_results = cell(length(uniqueIDs) + 1, 3); % +1 for header row

% Define column headers
all_results(1,:) = {'participant_id', 'da', 'meta_da'};

% Loop through each participant
for i = 1:length(uniqueIDs)
    currentID = uniqueIDs{i};  % Extract the string from the cell
    
    % Filter data for current participant using strcmp for string comparison
    participant_data = data(strcmp(data.participant_id, currentID), :);
    
    % Access data for this participant
    stimID = participant_data.stimID;
    response = participant_data.response;
    rating = participant_data.rating;
    
    % Count Data
    [nR_S1, nR_S2] = trials2counts(stimID, response, rating, 6, 1);
    
    % meta-d
    result = fit_meta_d_MLE(nR_S1, nR_S2);
    
    % Display results for current participant
    fprintf('Results for participant %s:\n', currentID);
    disp(result);
    
    % Store results in the cell array
    all_results(i+1,:) = {currentID, result.da, result.meta_da};
end

% Write all results to CSV
writecell(all_results, 'all_participants_results.csv');
