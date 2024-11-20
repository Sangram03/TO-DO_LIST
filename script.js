document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerButton = document.getElementById('startTimerButton');
    const stopTimerButton = document.getElementById('stopTimerButton');
    const resetTimerButton = document.getElementById('resetTimerButton');
    const timerStatus = document.getElementById('timerStatus');

    let timerInterval;
    let timeRemaining = 1500; // 25 minutes in seconds

    // Add task functionality
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        taskItem.querySelector('.delete').addEventListener('click', () => {
            taskItem.remove();
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
    });

    // Start Timer functionality
    startTimerButton.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval); // Reset the timer if already running

        startTimerButton.classList.add('hidden');
        stopTimerButton.classList.remove('hidden');
        resetTimerButton.classList.remove('hidden');

        timerInterval = setInterval(() => {
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            // Format time as MM:SS
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Update the timer status
            timerStatus.textContent = 'Work in progress...';

            // Decrease the time
            timeRemaining--;

            // When time runs out
            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = '00:00';
                timerStatus.textContent = 'Time for a break!';

                // Set time for the rest period (5 minutes)
                timeRemaining = 300; // 5 minutes in seconds
            }
        }, 1000); // Update the timer every second
    });

    // Stop Timer functionality
    stopTimerButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        startTimerButton.classList.remove('hidden');
        stopTimerButton.classList.add('hidden');
        resetTimerButton.classList.remove('hidden');
        timerStatus.textContent = 'Timer Stopped';
    });

    // Reset Timer functionality
    resetTimerButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        timeRemaining = 1500; // Reset to 25 minutes
        timerDisplay.textContent = '25:00';
        timerStatus.textContent = 'Ready to start working!';
        startTimerButton.classList.remove('hidden');
        stopTimerButton.classList.add('hidden');
        resetTimerButton.classList.add('hidden');
    });
});
