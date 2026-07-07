// ====================================
// Safetii Net
// Main JavaScript File
// ====================================

console.log("🦸 Welcome to Safetii Net!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Safetii Net Loaded Successfully!");

    const button = document.querySelector(".button");

    if (button) {
        button.addEventListener("click", () => {
            alert(
                "🎉 Welcome, Cyber Super Hero!\n\nYour first mission begins now!"
            );
        });
    }
});
