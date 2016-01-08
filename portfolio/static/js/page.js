$(document).ready(function() {
    $('body').addClass('js');

    var colors;
    var current = $('.sections .current');

    if (current.length > 0) {
        document.title = current.attr('title');
        move_current(false);
        colors = eval(current.attr('colors'));
    }
    else
        colors = eval($('.sections').attr('colors'));

    $('body').on('click', '.section', click_section);
    $('body').on('transitionend', '#current', change_section);
    $(window).on('popstate', pop);

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

function pop(event) {
    var x, y, colors;

    if (window.location.pathname == '/') {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
        colors = eval($('.sections').attr('colors'));

        go_home(window.location.pathname);
    }
    else {
        var current = $('.section[href="' + window.location.pathname + '"]');
        x = current.offset().left + current.width() / 2;
        y = current.offset().top + current.height() / 2;
        colors = eval(current.attr('colors'));

        start_change_section(current, false);
    }

    triangles.morph(x, y, colors);
}

function go_home(home) {
    $('.content').addClass('hidden');
    // Unset current
    $('.section').removeClass('current');
    // Hide slider
    $('#current').css('opacity', '0');
}

function start_change_section(section, push) {
    var existing_current = $('.sections .current').length > 0;

    // Hide content
    $('.content').addClass('hidden');
    // Change section title
    document.title = section.attr('title');
    // Change current section
    $('.section').removeClass('current');
    section.addClass('current');
    // Move slider
    move_current(existing_current);
    // Push state
    if (push) window.history.pushState({}, document.title, section.attr('href'));
}

function change_section(event) {
    $.ajax($('.sections .current').attr('href')).done(load_new_page);
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

    $('#current').css('opacity', '1');
}

function load_new_page(page_html) {
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
    // Show content
    $('.content').removeClass('hidden');
}
