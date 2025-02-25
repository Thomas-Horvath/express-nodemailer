
const form = document.querySelector(".emailForm");


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Form adatok begyűjtése

    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;



    await fetch("/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, text, email }),
    });

    // Form resetelése
    form.reset();
});


