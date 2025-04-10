// 冥想記錄數據
let meditationData = {
    total: 0,
    emotions: {
        '😔': 0,
        '😕': 0,
        '😐': 0,
        '🙂': 0,
        '😊': 0
    }
};

// DOM 元素
const logButton = document.getElementById('log-meditation');
const modal = document.getElementById('emotion-modal');
const submitButton = document.getElementById('submit-emotion');
const totalMeditations = document.getElementById('total-meditations');
const avgEmotion = document.getElementById('avg-emotion');
let selectedEmotion = null;

// 事件監聽器
logButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// 關閉模態框
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 選擇情緒
document.querySelectorAll('.emotion-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedEmotion = button.dataset.emotion;
        document.querySelectorAll('.emotion-btn').forEach(btn => {
            btn.style.transform = 'scale(1)';
        });
        button.style.transform = 'scale(1.2)';
    });
});

// 提交情緒
submitButton.addEventListener('click', () => {
    if (selectedEmotion) {
        // 更新數據
        meditationData.total++;
        meditationData.emotions[selectedEmotion]++;

        // 更新顯示
        totalMeditations.textContent = meditationData.total;
        updateAverageEmotion();

        // 重置並關閉模態框
        selectedEmotion = null;
        modal.style.display = 'none';
        document.querySelectorAll('.emotion-btn').forEach(btn => {
            btn.style.transform = 'scale(1)';
        });
    }
});

// 計算平均情緒
function updateAverageEmotion() {
    let total = 0;
    let count = 0;
    const emotionValues = {
        '😔': 1,
        '😕': 2,
        '😐': 3,
        '🙂': 4,
        '😊': 5
    };

    for (const [emotion, value] of Object.entries(meditationData.emotions)) {
        total += emotionValues[emotion] * value;
        count += value;
    }

    const average = Math.round(total / count);
    const emotionMap = {
        1: '😔',
        2: '😕',
        3: '😐',
        4: '🙂',
        5: '😊'
    };

    avgEmotion.textContent = emotionMap[average] || '😐';
}

// 初始化顯示
updateAverageEmotion(); 