let options = document.querySelectorAll(".search-option-list li");

options.forEach((option, index) => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.search-section').forEach(div => {
            div.style.display = 'none';
        });

        switch(index) {
            case 0:
                document.querySelector('#zad2').style.display = 'block';
                break;
            case 1:
                document.querySelector('#zad3').style.display = 'block';
                break;
            case 2:
                document.querySelector('#zad4').style.display = 'block';
                break;
            case 3:
                document.querySelector('#zad7').style.display = 'block';
                break;
            case 4:
                document.querySelector('#zad8').style.display = 'block';
                break;
            default:
                break;
        }
    });
});
