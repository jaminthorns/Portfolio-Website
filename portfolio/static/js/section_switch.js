$(document).ready(function() {
    $('body').on('click', '.section', switch_section);
});

function switch_section(event) {
    var target = $(event.currentTarget);

    if (!target.hasClass('current')) {
        $.ajax(target.attr('href'))
        .done(function(section_html) {
            var section = $(section_html);
            var urls = {'SCRIPT': 'src', 'LINK': 'href'};

            // Get scripts and links that are not already in head
            var head = section.filter('script, link').filter(function (index, element) {
                var tag = element.tagName;
                var url = $(element).attr(urls[tag]);

                // Check if script or link already exists in head
                return $('head [' + urls[tag] +'="' + url + '"]').length == 0;
            });

            // Load new scripts and links
            $('head').append(head);
            // Load content
            $('.content').replaceWith(section.filter('.content'));
            // Change URL
            history.pushState({}, document.title, target.attr('href'));
            // Change current section
            $('.section').removeClass('current');
            target.addClass('current');
        });
    }

    return false;
}
