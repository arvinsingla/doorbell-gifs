const gifForm = document.getElementById('gif-form');
        gifForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const gifUrlInput = document.getElementById('gif-url');
            const gifUrl = gifUrlInput.value;
            if (!gifUrl) {
                return;
            }
            const doorbellGif = document.querySelector('.doorbell-gif');
            doorbellGif.src = gifUrl;
            doorbellGif.title = 'Custom Gif';
            gifUrlInput.value = '';
        });
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const contentDiv = document.getElementById('links');
                data.forEach(item => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = item.name;
                    link.addEventListener('click', () => {
                        const doorbellGif = document.querySelector('.doorbell-gif');
                        doorbellGif.src = `gifs/${item.image}`;
                        doorbellGif.title = item.name;
                    });
                    contentDiv.appendChild(link);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });