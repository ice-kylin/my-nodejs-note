"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const deleteBtns = document.getElementsByClassName("delete-btn");

    document.addEventListener("click", event => {
        if ([...deleteBtns].includes(event.target)) {
            if (!confirm("确定要删除吗？")) {
                event.preventDefault();
            }
        }
    });
});
