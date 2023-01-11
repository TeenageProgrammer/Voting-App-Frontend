const socket = io('https://voting-app-server-57ji.onrender.com');

const progressBoxes = document.querySelectorAll('.progress-box');
const percentTags = document.querySelectorAll('.percent-tag');
const totalVotesElem = document.getElementById('totalVotes');

for (let i = 0; i < progressBoxes.length; i++) {
    const elem = progressBoxes[i];
    elem.addEventListener('click',()=>{
        addVote(elem,elem.id)
    })
}

let vote = false;

const addVote = (elem,id)=>{
    if (vote) {
        return
    }
    let voteTo = id;
    socket.emit('send-vote',voteTo);
    vote = true;
    elem.classList.add('active');
}

socket.on('receive-vote',data =>{
    updatePolls(data)
})

socket.on('update',data =>{
    updatePolls(data)
})

const updatePolls = (data)=>{
    let votingObject = data.votingPolls;
    let totalVotes = data.totalVotes;
    totalVotesElem.innerHTML = totalVotes
    for (let i = 0; i < percentTags.length; i++) {
        let vote = votingObject[progressBoxes[i].id];
        let setWidth = Math.round(vote / totalVotes * 100);
        const elem = document.querySelector(`#${progressBoxes[i].id}`)
        .querySelector('.percent-tag');
        elem.setAttribute('data',`${!setWidth? 0: setWidth}%`);
        elem.style.width = `${!setWidth? 0: setWidth}%`;
    }
}