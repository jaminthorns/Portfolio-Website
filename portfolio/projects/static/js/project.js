$(document).ready(function() {
    $('body').on('click', '.projects .project', open_project_detail);
    $('body').on('click transitionend', '.project-detail-container', close_project_detail);
});

function open_project_detail(event) {
    var project_id = $(event.currentTarget).attr('project-id');
    var container = $('.project-detail-container');

    $.ajax('/projects/project_detail/' + project_id)
    .done(function(project_detail) {
        var project_detail = $(project_detail).appendTo(container);
        setup_project_detail(project_detail);
        container.addClass('active');
    });
}

function close_project_detail(event) {
    var target = $(event.target);

    if (event.type == 'click' && target.hasClass('project-detail-container')) {
        target.css('opacity', '0');
        target.css('pointer-events', 'none');
    }
    else if (event.type == 'transitionend' && target.css('opacity') == 0) {
        target.removeAttr('style');
        target.removeClass('active');
        target.empty();
    }
}
