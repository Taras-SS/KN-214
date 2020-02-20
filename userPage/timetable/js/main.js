checkTimetable = () => {
    let from_1 = document.getElementById(`selectTimeFromWork`);
    from_1 = from_1.options[from_1.selectedIndex].label;

    let to_1 = document.getElementById(`selectTimeToWork`);
    to_1 = to_1.options[to_1.selectedIndex].label;

    let from_2 = document.getElementById(`selectTimeFromDaysOff`);
    from_2 = from_2.options[from_2.selectedIndex].label;

    let to_2 = document.getElementById(`selectTimeToDaysOf`);
    to_2 = to_2.options[to_2.selectedIndex].label;


    $.ajax({
       url: `/timetabel`,
       type: `POST`,
       data: {
           WorkdaysFrom: from_1,
           WorkdaysTo: to_1,
           DaysOffFrom: from_2 ,
           DaysOffTo: to_2
       },
      success: response => {
            window.location.reload();
       }
    });

}