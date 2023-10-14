import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="recording"
export default class extends Controller {
  static targets = ["start", "stop"]
  startRecording(e) {
    
    e.preventDefault()

    this.chunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.startTarget.classList.add("hidden")
      this.stopTarget.classList.remove("hidden")

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          console.log("DATA AVAILABLE", e)
          const audioUrl = URL.createObjectURL(e.data);
          const audio = new Audio(audioUrl);
          setTimeout(() => {
            console.log('ISPLAYING')
            audio.play();
          }, 1000)
        }
        this.mediaRecorder.onstop = (e) => {
          console.log("ONSTOP")
          
        }
        this.mediaRecorder.start()
    })
    .catch((err) => {
      /* handle the error */
      console.log("ERORR PERMISSIONS DENIED")
    });
  }

  stopRecording(e) {
    e.preventDefault()
    if (this.mediaRecorder) {
      this.mediaRecorder.stop()
      this.startTarget.classList.remove("hidden")
      this.stopTarget.classList.add("hidden")
    } else {
      console.log("No Media Recorder", this.mediaRecorder)
    }
  }
}
