$(document).ready(function() {
    var current = $('.sections .current');

    $('body').addClass('js');
    document.title = current.attr('title');
    move_current(false);

    $('body').on('click', '.section', click_section);
    $('body').on('transitionend', '.section', change_section);
    $(window).on('popstate', pop_section);
    
    var colors = eval(current.attr('colors'));
    triangles = new Triangles($('#background')[0], colors, 75, 2, 0.4, 10, 0.15, 25);
});

function click_section(event) {
    var target = $(event.currentTarget);
    
    var colors = eval(target.attr('colors'));
    triangles.morph(event.pageX, event.pageY, colors);

    if (!target.hasClass('current'))
        start_change_section(target, true);

    return false;
}

function pop_section(event) {
    var current = $('.section[href="' + window.location.pathname + '"]');
    var x = current.offset().left + current.width() / 2;
    var y = current.offset().top + current.height() / 2;
    var colors = eval(current.attr('colors'));

    triangles.morph(x, y, colors);
    start_change_section(current, false);
}

function start_change_section(section, push) {
    $('.content').addClass('hidden');
    // Change section title
    document.title = section.attr('title');
    // Change current section
    $('.section').removeClass('current');
    section.addClass('current');
    move_current(true);
    // Push state
    if (push) window.history.pushState({}, document.title, section.attr('href'));
}

function change_section(event) {
    if (event.currentTarget == $('.sections .current')[0]) {
        $.ajax($(event.currentTarget).attr('href'))
        .done(function(page_html) {
            var page = $(page_html);
            var urls = {'SCRIPT': 'src', 'LINK': 'href'};

            // Get scripts and links that are not already in head
            var head = page.filter('script, link').filter(function (index, element) {
                var tag = element.tagName;
                var url = $(element).attr(urls[tag]);

                // Check if script or link already exists in head
                return $('head [' + urls[tag] +'="' + url + '"]').length == 0;
            });

            // Load new scripts and links
            $('head').append(head);
            // Load content
            $('.content').empty();
            $('.content').append(page.filter('.content').children());
            $('.content').removeClass('hidden');
        });
    }
}

function move_current(animate) {
    var section = $('.sections .current');
    var current = $('#current');
    var translate = section.offset().left - section.parent().offset().left;

    if (!animate) current.addClass('notransition');

    current.css('transform', 'translateX(' + translate + 'px)');

    if (!animate)
    {
        current[0].offsetHeight;
        current.removeClass('notransition');
    }
}
