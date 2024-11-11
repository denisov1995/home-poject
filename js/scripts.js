$(document).ready(function () {

    // Закрыть модальное окно при успешной отправке формы
    document.addEventListener('fetchit:success', ({
        detail: {
            form
        }
    }) => {
        const modal = form.closest('.modal');
        const modalInstance = bootstrap.Modal.getInstance(modal);

        if (!modalInstance) {
            return;
        }

        modalInstance.hide();
    });
    // checkCookies();
    mobileEvents();
    sliders_and_carousels();
    omni_fos_modal();
    common();
    desktopEvents();
    fastPreviev();
    projectCalc();
    mFilterCheckBoxesToggler();
    phoneMask();
    //yaMap();

});
//  ---------------------------
function mobileEvents() {
    const $toggler = $('.mm__toggler');
    const $closer = $('.mm__close');
    const $mobile_menu = $('.mobile-menu');
    const $content = $('.mm__content');
    const $wrapper = $('.mm__wrapper');
    const $body = $('body');

    $toggler.on('click', function (event) {

        let $target = $(this).attr('data-toggle');
        let $menu = $('#' + $target);

        if ($menu.hasClass('opened')) {
            closeMenu();
        } else {
            $('#' + $target).addClass('opened');
            $mobile_menu.not($('#' + $target)).removeClass('opened');
            $body.addClass('overflow');
            event.stopPropagation();
            return false;
        }

    });

    [$closer, $wrapper].map(function (item) {
        item.on('click', function () {
            closeMenu();
        })
    });

    [$mobile_menu, $content].map(function (item) {
        item.on('click', function (event) {
            event.stopPropagation();
        })
    });

    function closeMenu() {
        $mobile_menu.removeClass('opened');
        $body.removeClass('overflow');
    }

    function mse2_seo_filters_toggle() {
        let $toggler = $('.mse2_filters_toggler');
        let $outer = $('.mse2_filters_outer');
        const $body = $('body');
        let $form = $outer.find('form');
        const $closer = $('.mse2_filters_closer');

        [$outer, $closer].map(function (item) {
            item.on('click', function () {
                closeFilters();
            })
        });

        [$form].map(function (item) {
            item.on('click', function (event) {
                event.stopPropagation();
            })
        });

        $toggler.on('click', function () {

            if ($outer.hasClass('opened')) {
                closeFilters();
            } else {
                $body.addClass('overflow');
                $outer.addClass('opened');
            }
        });

        function closeFilters() {
            $outer.removeClass('opened');
            $body.removeClass('overflow');
        }

    }
    mse2_seo_filters_toggle();
}

function desktopEvents() {
    const dropdowns = document.querySelectorAll('.main-menu .dropdown');

    dropdowns.forEach(function (dropdown) {
        let dropToggler = dropdown.querySelector('.drop-toggler');
        let dropMenu = dropdown.querySelector('.drop-menu');
        let cursorLeftTime;
        let timer;

        dropToggler.addEventListener("mouseenter", function () {
            hideOtherMenus(dropdowns, dropMenu);
            timer = setTimeout(function () {
                dropMenu.style.display = 'block';
            }, 100);
        });

        dropToggler.addEventListener("mouseleave", function () {
            clearTimeout(timer);
        });

        dropMenu.addEventListener('mouseenter', function () {
            clearTimeout(cursorLeftTime);
        });

        dropMenu.addEventListener('mouseleave', function () {
            cursorLeftTime = setTimeout(function () {
                dropMenu.style.display = 'none';
            }, 500);
        });

        document.addEventListener("mouseup", function (e) {
            if (!dropMenu.contains(e.target)) {
                dropMenu.style.display = 'none';
            }
        });
    });

    // Функция для скрытия всех других выпадающих меню
    function hideOtherMenus(allMenus, currentMenu) {
        allMenus.forEach(function (menu) {
            if (menu !== currentMenu) {
                menu.querySelector('.drop-menu').style.display = 'none';
            }
        });
    }
}

function checkCookies() {
    let cookieNoteDate = localStorage.getItem('cookieNoteDate');
    let cookieNotification = document.getElementById('ckie-note');
    let cookieBtn = cookieNotification.querySelector('.cookie-accept');
    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieNoteDate || (+cookieNoteDate + 31536000000) < Date.now()) {
        cookieNotification.classList.add('show');
    }
    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
    cookieBtn.addEventListener('click', function () {
        localStorage.setItem('cookieNoteDate', Date.now());
        cookieNotification.classList.remove('show');
    })
}

function sliders_and_carousels() {

    const swiper6 = new Swiper('.swiper-6', {
        // Optional parameters
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            400: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1440: {
                slidesPerView: 6,
                spaceBetween: 16,
            }
        }
    });

    const gallery_swiper = new Swiper('.gallery-slider', {
        // Optional parameters        
        loop: false,
        // autoplay:{
        //     delay:3000
        // },

        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 16,
            },
        },

        // Navigation arrows
        navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
        }
    });

    const team_swiper = new Swiper('.team-slider', {
        // Optional parameters
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 16,
            }
        }
    });


    const product_gallery_thumbs_swiper = new Swiper('.product-gallery-thumbs', {
        // Optional parameters        
        loop: false,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    const product_gallery_big_swiper = new Swiper('.product-gallery-big', {
        // Optional parameters        
        loop: true,
        thumbs: {
            swiper: product_gallery_thumbs_swiper,
        },
    });

    function data_swiper_slider() {
        var sliderSelector = '.data-swiper-slider',
            defaultOptions = {
                slidesPerView: 1,
                spaceBetween: 16,
                // autoplay:{
                //     delay:500,
                //     pauseOnMouseEnter:true
                // },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                on: {
                    slideChange: function (el) {
                        $('.swiper-slide').each(function () {
                            var youtubePlayer = $(this).find('iframe').get(0);
                            if (youtubePlayer) {
                                youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                            }
                        });
                    },
                }
            };

        var dataSwiper = document.querySelectorAll(sliderSelector);

        [].forEach.call(dataSwiper, function (slider, index, arr) {
            var data = slider.getAttribute('data-swiper') || {};

            if (typeof (data !== 'undefined')) {
                // Разбить строку на массив, если это необходимо

                if (typeof data === 'string') {
                    var swiperDataArray = data.split(',');
                    var obj = {};

                    // Проходим по каждой строке массива и разбиваем ее на ключ и значение
                    swiperDataArray.forEach(function (item) {
                        var parts = item.split(':');
                        var key = parts[0];
                        var value = parts[1];
                        obj[key] = value;
                    });

                    // Преобразуем объект в JSON-строку
                    var dataOptions = (obj);
                }
            }
            //console.log(typeof(dataOptions));
            slider.options = Object.assign({}, defaultOptions, dataOptions);
            //console.log(slider.options);
            var swiper = new Swiper(slider, slider.options);

            //console.log(slider.option)

            /* stop on hover */
            if (typeof slider.options.autoplay !== 'undefined' && slider.options.autoplay !== false) {
                slider.addEventListener('mouseenter', function (e) {
                    swiper.autoplay.stop();
                    console.log('stop')
                });

                slider.addEventListener('mouseleave', function (e) {
                    swiper.autoplay.start();
                    console.log('start')
                });
            }
        });
    }
    data_swiper_slider();

    const ppc_slider = new Swiper('.ppc-slider', {
        // Optional parameters        
        loop: false,
        spaceBetween: 16,
        slidesPerView: 1,

        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    Fancybox.bind("[data-fancybox]", {
        // Thumbs: false
    });
}

function omni_fos_modal() {

    let $ofm_call_button = $('.ofm-call-button');

    //console.log($ofm_call_button);
    const $modalTitle = $('.omni-fos-modal .modal-title');
    const $ofm_form_button_info = $(".ofm-form input[name='button_info']");
    const $submit_button_text = $(".ofm-form :submit .button_text");
    const $formText = $(".ofm-form .formText");
    let $buttonInfo, $ofmButtonName, $ofmFormText, $modalTitleText;
    // const $ofmForm = $(".ofm-form");

    function updateModalContent(buttonInfo, modalTitleText, ofmButtonName, ofmFormText) {
        //console.log((buttonInfo, modalTitleText, ofmButtonName, ofmFormText) );
        $ofm_form_button_info.val(buttonInfo);
        $modalTitle.html(modalTitleText);
        $submit_button_text.html(ofmButtonName !== undefined ? ofmButtonName : 'Отправить');
        //$formText.html(ofmFormText !== undefined ? ofmFormText : '');
    }

    function handleClick() {
        let $this = $(this);
        //console.log($this);
        $buttonInfo = $this.attr('data-ofm-button-info');
        $modalTitleText = $this.attr('data-ofm-modal-title');
        $ofmButtonName = $this.attr('data-ofm-button-name');
        $ofmFormText = $this.attr('data-ofm-form-text');
        updateModalContent($buttonInfo, $modalTitleText, $ofmButtonName, $ofmFormText);
    }

    $ofm_call_button.on('click', handleClick);
}

function fastPreviev() {
    const ppcFastPreview = function () {
        //const $ppcFPcallButton = $('.ppc-fast-preview-call-button');
        const $ppcFPmodal = $('#ppc-fast-preview-modal');
        const $ppcFPmodalBody = $('#ppc-fast-preview-modal .modal-body');
        const $ppcFPBSmodal = new bootstrap.Modal($ppcFPmodal, {});
        let ppcfp_big_swiper;
        let ppcfp_thumbs_swiper;

        $ppcFPmodal.on('hidden.bs.modal', () => {
            destroySwipers();
        });

        $(document).on('click', '.ppc-fast-preview-call-button', function () {
            const action = $(this).data('action');
            const id = $(this).data('id');

            $.post(document.location.href, {
                action,
                id
            }, function (data) {
                $ppcFPBSmodal.show();
                $ppcFPmodalBody.html(data);
                initializeSwipers();
            });

            return false;
        });

        function initializeSwipers() {
            ppcfp_thumbs_swiper = new Swiper('#ppc-fast-preview-modal .product-gallery-thumbs', {
                loop: false,
                spaceBetween: 10,
                slidesPerView: 3,

                breakpoints: {

                    480: {
                        slidesPerView: 3,
                        spaceBetween: 16
                    },

                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 16
                    }
                },

                watchSlidesProgress: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            ppcfp_big_swiper = new Swiper('#ppc-fast-preview-modal .product-gallery-big', {
                loop: false,
                thumbs: {
                    swiper: ppcfp_thumbs_swiper,
                },
            });
        }

        function destroySwipers() {
            if (ppcfp_big_swiper) {
                ppcfp_big_swiper.destroy();
            }
            if (ppcfp_thumbs_swiper) {
                ppcfp_thumbs_swiper.destroy();
            }
        }
    }();

    const teamFastPreview = function () {

        $(document).on('click', '.team-fast-preview-button', function () {
            const $teamFPmodal = $('#team-fast-preview-modal');
            const $teamFPmodalBody = $('#team-fast-preview-modal .modal-body');
            const $teamFPBSmodal = new bootstrap.Modal($teamFPmodal, {});
            const action = $(this).data('action');
            const id = $(this).data('id');
            const idx = $(this).data('idx');
            $.post(document.location.href, {
                action,
                id,
                idx
            }, function (data) {
                $teamFPBSmodal.show();
                $teamFPmodalBody.html(data);
            });

            return false;
        });
    }();

    const reviewModal = function () {
        $(document).on('click', '.text-review .read-more', function () {
            let data = $(this).data('text');
            let title = $(this).data('title');
            let date = $(this).data('date');
            let titleText = title + ' - ' + date;
            const $modal = $('#omni-content-modal');
            const $modalTitle = $('#omni-content-modal .modal-title');
            const $modalBody = $('#omni-content-modal .modal-body');
            const $modalInit = new bootstrap.Modal($modal, {});


            $modalTitle.empty().html(titleText);
            $modalBody.empty().html(data);
            $modalInit.show();

            return false;
        });
    }();
}

function phoneMask() {
    $('input[type="tel"]').each(function (id, inp) {
        // Проверяем фокус
        inp.addEventListener('focus', _ => {
            // Если там ничего нет или есть, но не начинается с плюса
            if (!/^\+\d*$/.test(inp.value))
                // Вставляем знак плюса как значение
                inp.value = '+';
        });

        inp.addEventListener('keypress', e => {
            // Отменяем ввод не цифр и ограничиваем длину ввода до 15 символов
            if (!/\d/.test(e.key) || e.target.value.length > 15)
                e.preventDefault();
        });
    });
}

function common() {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    $(document).ajaxSuccess(function (event, xhr, settings) {

        observer.observe();

    });

    let initUiSlider = function () {
        $(".ui-slider").each(function () {
            let $this = $(this);
            $this.draggable({
                cursor: 'move',
                handle: ".ui-drag-handle",
                start: function () {
                    console.log("Drag Start");
                },
                stop: function () {
                    console.log("Drag Stop");
                }
            });
        });
    };

    initUiSlider();

    const copyToClipboard = async (inputValue) => {
        try {
            await navigator.clipboard.writeText(inputValue);
            iziToast.success({
                message: `${inputValue} скопировано в буфер обмена!`,
                timeout: 3000,
                layout: 2,
            });
        } catch (err) {
            iziToast.error({
                message: 'Что-то пошло не так при копировании в буфер обмена.',
                timeout: 3000,
                layout: 2,
            });
            console.error('Something went wrong:', err);
        }
    };

    document.querySelectorAll('.cb_copy').forEach(button => {
        button.addEventListener('click', () => {
            const text = button.getAttribute('data-text');

            if (text) {
                const inputValue = text.trim();

                if (window.isSecureContext && navigator.clipboard) {
                    copyToClipboard(inputValue);
                } else {
                    iziToast.success({
                        message: `${inputValue} скопировано в буфер обмена!`,
                        timeout: 3000,
                        layout: 2,
                    });
                    console.warn('Используйте HTTPS для копирования.');
                }
            }
        });
    });


    let $totop = $(".to-top");

    $totop.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });

    $(() => {
        let $fast_links_toggler = $('.fast-links-toggler');
        let $fast_links = $('.fast-links');
        $fast_links_toggler.on("click", function () {
            $(this).toggleClass("rotate");
            $fast_links.toggleClass("hidden");
        });
    });



    $(document).on('pdopage_load', function (e, config, response) {
        //console.log(e, config, response);
        if (typeof onYouTubePlayerAPIReady === 'function') {
            // Вызываем функцию
            onYouTubePlayerAPIReady();
        } else {
            // Если функция не определена, выводим ошибку
            console.error("onYouTubePlayerAPIReady is not defined!");
        }
    });

    // let inputPlusMinus = function () {
    //     $("body").on('click', '.quantity-input .btn-minus', function () {
    //         let $input = $(this).parent().find('.quantity');
    //         let step = parseInt($input.data('step')) || 1;
    //         let inputValue = $input.val();
    //         let count = parseInt(inputValue) - step;
    //         count = count < 1 ? 1 : count;
    //         $input.val(count);
    //     });

    //     $("body").on('click', '.quantity-input .btn-plus', function () {
    //         let $input = $(this).parent().find('.quantity');
    //         let step = parseInt($input.data('step')) || 1;
    //         let inputValue = $input.val();
    //         let maxCount = parseInt($input.data('max-count')) || Infinity;
    //         let count = parseInt(inputValue) + step;
    //         count = count > maxCount ? maxCount : count;
    //         $input.val(count);
    //     });
    // }();
}

function projectCalc() {
    const ESKIZ_PRICE_PER_SQM = 400;
    const ARCHITECT_PRICE_PER_SQM = 800;
    const CONSTRUCT_PRICE_PER_SQM = 3000;
    const MIN_SQUARE = 10;

    const ProjectCalculator = {
        init() {
            this.cacheDom();
            if (!this.calculator) return;
            this.bindEvents();
            this.calculateTotalCost();
        },

        cacheDom() {
            this.calculator = document.querySelector('.projecting-calculator');
            if (!this.calculator) return;

            this.squareInput = this.calculator.querySelector('#square');
            this.btnMinus = this.calculator.querySelector('.btn-minus');
            this.btnPlus = this.calculator.querySelector('.btn-plus');
            this.totalCostElement = this.calculator.querySelector('.total-cost .digits');
            this.totalCostInput = this.calculator.querySelector('.total-cost input[name="totalCost"]');
            this.eskizCheckbox = this.calculator.querySelector('#projecting-queez-1');
            this.architectCheckbox = this.calculator.querySelector('#projecting-queez-2');
            this.constructCheckbox = this.calculator.querySelector('#projecting-queez-3');
            this.modalButton = this.calculator.querySelector('.ofm-call-button');
            this.calculatorForm = document.getElementById('projecting-queez-form');
            this.modalForm = document.getElementById('ofm-form');
        },

        bindEvents() {
            if (!this.calculator) return;

            this.btnMinus.addEventListener('click', this.handleMinusClick.bind(this));
            this.btnPlus.addEventListener('click', this.handlePlusClick.bind(this));
            this.squareInput.addEventListener('input', this.handleSquareInput.bind(this));
            [this.eskizCheckbox, this.architectCheckbox, this.constructCheckbox].forEach(checkbox => {
                checkbox.addEventListener('change', this.calculateTotalCost.bind(this));
            });

            if (this.modalButton) {
                this.modalButton.addEventListener('click', this.handleModalButtonClick.bind(this));
            }
        },

        calculateTotalCost() {
            const square = parseInt(this.squareInput.value) || MIN_SQUARE;

            let totalCost = 0;

            if (this.eskizCheckbox.checked) totalCost += square * ESKIZ_PRICE_PER_SQM;
            if (this.architectCheckbox.checked) totalCost += square * ARCHITECT_PRICE_PER_SQM;
            if (this.constructCheckbox.checked) totalCost += square * CONSTRUCT_PRICE_PER_SQM;

            this.updateTotalCost(totalCost);
        },

        updateTotalCost(totalCost) {

            this.totalCostElement.textContent = totalCost.toLocaleString();
            this.totalCostInput.value = totalCost;
        },

        handleMinusClick() {
            const step = parseInt(this.squareInput.dataset.step) || 10;
            const newSquare = Math.max(MIN_SQUARE, parseInt(this.squareInput.value) - step);

            this.updateSquareInputValue(newSquare);
        },

        handlePlusClick() {
            const step = parseInt(this.squareInput.dataset.step) || 10;
            const newSquare = parseInt(this.squareInput.value) + step;

            this.updateSquareInputValue(newSquare);
        },

        handleSquareInput() {
            let value = parseInt(this.squareInput.value);
            if (isNaN(value) || value <= 0) {
                value = MIN_SQUARE;
            }

            this.updateSquareInputValue(value);
        },

        updateSquareInputValue(value) {
            this.squareInput.value = value;
            this.calculateTotalCost();

        },

        getFormDataString(form) {
            let formDataString = '';

            const checkedCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked');
            checkedCheckboxes.forEach(checkbox => {
                const label = form.querySelector(`label[for="${checkbox.getAttribute('id')}"]`);
                if (label) {
                    const labelText = label.textContent.trim();
                    formDataString += labelText + ', ';
                }
            });

            const numberInput = form.querySelector('input[type="number"]');
            if (numberInput) {
                const numberLabel = form.querySelector(`label[for="${numberInput.getAttribute('id')}"]`);
                if (numberLabel) {
                    const numberLabelText = numberLabel.textContent.trim();
                    formDataString += numberLabelText + ': ' + numberInput.value + ', ';
                }
            }

            const totalCostInput = form.querySelector('input[name="totalCost"]');
            if (totalCostInput) {
                formDataString += 'Итоговая стоимость: ' + totalCostInput.value + ' руб, ';
            }

            formDataString = formDataString.trim().replace(/,\s*$/, '');
            return formDataString;
        },

        handleModalButtonClick() {
            const formDataString = this.getFormDataString(this.calculatorForm);
            const formDataInput = this.modalForm.querySelector('input[name="form_data"]');

            if (formDataInput) {
                formDataInput.value = formDataString;
            } else {
                // Можно раскомментировать код ниже, если это нужно.
                // this.createHiddenInput('form_data', formDataString);
            }

            const ofm = document.getElementById('omni-fos-modal');
            if (ofm) {
                ofm.addEventListener('hidden.bs.modal', () => {
                    const formDataInput = this.modalForm.querySelector('input[name="form_data"]');
                    if (formDataInput) {
                        formDataInput.value = ''; // Очищаем значение input
                    }
                });
            }
        }
    };

    ProjectCalculator.init();
}



function mFilterCheckBoxesToggler() {
    const filterControls = document.querySelector('.filter-controls');
    if (!filterControls) return;
    const fieldsets = filterControls.querySelectorAll('fieldset');

    fieldsets.forEach(fieldset => {
        const toggleButton = fieldset.querySelector('.btn-toggle-all');
        const checkboxesRow = fieldset.querySelector('.checkboxes-row');

        if (!checkboxesRow) return;

        const checkboxCols = checkboxesRow.querySelectorAll('.checkbox-col');
        const shouldShowButton = checkboxCols.length > 10;

        if (shouldShowButton) {
            toggleButton.classList.add('show');
        }

        toggleButton.addEventListener('click', () => {
            checkboxCols.forEach(checkboxCol => {
                checkboxCol.style.display = 'block';
            });

            toggleButton.style.display = 'none';
        });
    });
}

var swiper = new Swiper('.swiper2', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 300,
    // centeredSlides: true,
    loop: true,

    breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20, },
        768: { slidesPerView: 3, spaceBetween: 30, },
        1024: { slidesPerView: 4, spaceBetween: 40, },
        1440: { slidesPerView: 6, spaceBetween: 40, },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// }

var swiper3 = new Swiper('.swiper3', {
    slidesPerView: 1,
    spaceBetween: 20,
    // speed: 300,
    // centeredSlides: true,
    loop: true,

    breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20, },
        768: { slidesPerView: 3, spaceBetween: 30, },
        1024: { slidesPerView: 3, spaceBetween: 40, },
        1440: { slidesPerView: 4, spaceBetween: 40, },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var swiper3 = new Swiper('.swiper4', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 300,
    // centeredSlides: true,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const splide = new Splide('.gallery', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 3,
    arrows: false,
    pagination: false,
    autoWidth: true,
    gap: 30,
    autoScroll: {
        speed: 1,
    }

})
console.log('splide', splide);
splide.mount(window.splide.Extensions)



document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const desktopDropdowns = document.querySelectorAll('.navbar-nav .dropdown');
    const button = document.querySelector('.navbar-toggler');
    const navbar = document.querySelector('.navbar');
    const body = document.querySelector('body');
    console.log('desktopDropdowns', desktopDropdowns);

    desktopDropdowns.forEach(el => {
        el.addEventListener('mouseover', (e) => {
            const parentDropdown = e.target.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('show');
            }
        })

        el.addEventListener('mouseout', (e) => {
            const parentDropdown = e.target.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.remove('show');
            }
        })
    })

    navbar.addEventListener('click', (e) => {

        const parentDropdown = e.target.closest('.dropdown.mob');
        if (!e.target.matches('.dropdown-button')) {
            dropdowns.forEach(el => el.classList.remove('show'));
        }
        if (parentDropdown) {
            const isActive = parentDropdown.classList.contains('show');
            // Сначала закроем все выпадающие списки
            dropdowns.forEach(el => el.classList.remove('show'));

            // Откроем только тот, на который кликнули, если он не был активен
            if (!isActive) {
                parentDropdown.classList.add('show');
            }
        }
    });



    button.addEventListener('click', () => {
        // if (window.scrollY === 0) {
        navbar.classList.toggle('black');
        // }
    });

    window.addEventListener('resize', () => {
        const el = document.querySelector('.mse2_filters_outer');
        if (window.innerWidth > 1024) {
            el?.classList.remove('opened');
            body.classList.remove('overflow');
        }
    });

    window.addEventListener('click', (e) => {

        if (!e.target.closest('.navbar')  && !e.target.closest('.modal-window') ) {
            navbar.classList.remove('black');
            navbarCollapse.classList.remove('show');
        }
    });
    //modal

    const modal = document.querySelector('.modal-window')
    const whereDoWeWork = document.querySelector('.where-do-we-work')
    const span = document.querySelector('.close');

    const modalContent = document.querySelector('.modal-content')


    modalContent.addEventListener('click', (e) => {
        e.preventDefault();
        const allCollapse = document.querySelectorAll('.collapse');
        console.log(111);
        if (e.target.classList[0] !== 'link_reg_cities') {
            return
        }


        // const collapse = document.querySelector('.link_reg_cities')

        function findNextElementWithClass(element, className) {
            let nextElement = element.nextElementSibling;
            while (nextElement) {
                if (nextElement.classList.contains(className)) {
                    return nextElement;
                }
                nextElement = nextElement.nextElementSibling;
            }
            return null; // Если элемент не найден
        }


        const nextElementWithClass = findNextElementWithClass(e.target, 'collapse');


        if (nextElementWithClass.classList.contains('show')) {
            nextElementWithClass.classList.remove('show')
        } else {
            allCollapse.forEach(el => {
                if (el.classList.contains('show')) {
                    el.classList.remove('show')
                }
            })
            nextElementWithClass.classList.add('show')
        }
    })

    whereDoWeWork.addEventListener('click', (ev) => {
        ev.preventDefault()
        console.log(123);
        modal.style.display = 'block';
        console.log('body', body);
        body.classList.add('overflow');
    });
    span.addEventListener('click', () => {
        modal.style.display = 'none';
        body.classList.remove('overflow');
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            body.classList.remove('overflow');
        }
    });
});


