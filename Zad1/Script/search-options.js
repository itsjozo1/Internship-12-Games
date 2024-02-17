let options = document.querySelectorAll(".search-option-list li");

options.forEach((option, index) => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.search-section').forEach(div => {
            div.style.display = 'none';
        });

        if (index === 0) {
            document.querySelector('#zad2').style.display = 'block';
        } else if (index === 1) {
            document.querySelector('#zad3').style.display = 'block';
        } else if (index === 2) {
            document.querySelector('#zad4').style.display = 'block';
        }
    });
});
