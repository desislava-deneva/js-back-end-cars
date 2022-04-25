document.getElementById('cars').addEventListener('click', (ev) => {
    if (ev.target.classList.contains('more')) {
        const btn = ev.target;
        const desc = btn.parentElement.querySelector('.description');
        if (desc.style.display == 'block') {
            desc.style.display = 'none';

            ev.target.textContent = 'Show More'
        } else {
            desc.style.display = 'block';
            btn.textContent = 'Hide';
        }
    }
});