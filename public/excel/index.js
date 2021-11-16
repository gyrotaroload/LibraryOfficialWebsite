// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");
    document.getElementById('make_it_html').value = 'html';
    setfmt();
    document.getElementById('xlf').addEventListener('change', () => {
        console.log("file value change");
        document.getElementById('the_file_name').innerText = document.getElementById('xlf').value;

        function do_render() {
            console.log("Prism.highlightAll();");
            document.getElementById("htmlOutCopy").innerHTML = document.getElementById("htmlout").innerHTML;
            //.ui.single.line.striped.selectable.unstackable.table(style='overflow-x: auto;')
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('ui');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('single');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('line');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('striped');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('selectable');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('unstackable');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('table');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].style.overflowX = 'auto';
        }
        //https://www.polarxiong.com/archives/%E4%BD%BF%E7%94%A8MutationObserver%E5%92%8CDOMSubtreeModified%E7%9B%91%E5%90%ACHTML%E4%B8%ADtitle%E7%9A%84%E5%8F%98%E5%8C%96.html
        var render_prism = function () {
            //do_render();
            var titleEl = document.getElementById("htmlout");
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                var MutationObserverConfig = {
                    childList: true,
                    subtree: true,
                    characterData: true
                };
                var observer = new MutationObserver(function (mutations) {
                    do_render();
                });
                observer.observe(titleEl, MutationObserverConfig);
            }
            else if (titleEl.addEventListener) {
                titleEl.addEventListener("DOMSubtreeModified", function (evt) {
                    do_render();
                }, false);
            }
            else {
                console.log('unsupported browser');
            }
        };
        render_prism();
    });
});