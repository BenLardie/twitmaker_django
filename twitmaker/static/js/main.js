document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    axios.post(
      this.action,
      formData,
    ).then(function(response) {
      let tweet = response.data;
      console.log(response);
      console.log(tweet);
      let li = document.createElement('li');
      let ol = document.querySelector('body > main > ol');
      let p = document.createElement('p');
      let time = document.createElement('time');
      let messageInput = document.getElementById('id_message');
      li.classList.add('tweet');
      p.innerHTML = tweet.message;
      time.innerHTML = tweet.created_at;
      li.append(time);
      li.append(p);
      ol.appendChild(li);
      messageInput.reset();

    }).catch(function(error) {
      console.log(error);
    });
  });
});