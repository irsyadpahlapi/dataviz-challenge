var datas = []
d3.csv("WorldCups.csv",function(d){
  return {
    year: d.Year,
    country: d.Country,
    winner: d.Winner,
    runnerup: d.RunnersUp,
    third: d.Third,
    fourth: d.Fourth,
    goalscored: d.GoalsScored,
    QualifiedTeams: d.QualifiedTeams,
    matchesplayed: d.MatchesPlayed,
    attendance: d.Attendance
  }
},function(data){
  data.map(response => {
    datas.push(response)
  })
  datas.reverse()
  console.log(datas);
  const colorScale = d3.scaleLinear()
  .domain([70,171])
  .range(["#FF5733","#3498DB"])
  const svg = d3.select('.chart')
              .append('svg')
              .attr('width',950)
              .attr('height',500)
              .style('background','#ddd')
  svg.selectAll('rect')
    .data(datas)
    .enter()
    .append('rect')
    .attr('id','showchart')
    .attr('x', (d,i) => {
      if(i === 0){
        return 20
      }
      else{
        return i * 45 + 20
      }
    })
    .attr('y', (d) => {
      return 500
    })
    .attr('fill','#ddd')
    .on('mouseover', function (d,i) {
      d3.select(this).style('fill', 'green')
    })
    .on('mouseout', function (d,i) {
      d3.select(this).style('fill', colorScale(d.goalscored))
    })
    .on('click', function (d,i) {
      swal(d.winner+" is winner fifa world "+d.year);
    })
    .transition()
    .duration(400)
    .delay(function(d, i) { return i * 400;})
    .attr('y', (d) => {
      return 500 - d.goalscored *2.5
    })
    .attr('height', (d) => {
      return d.goalscored *2.5
    })
    .attr('fill', d => {
      return colorScale(d.goalscored)
    })

    svg.selectAll('text')
      .data(datas)
      .enter()
      .append('text')
      .attr('x', (d,i) => {
        if(i === 0){
          return 26
        }
        else{
          return i * 45 + 28
        }
      })
      .transition()
      .duration(400)
      .delay(function(d, i) { return i * 400;})
      .attr('y', (d) => {
        return 490 - d.goalscored * 2.5
      })
      .attr('height', (d) => {
        return d.goalscored *2.5
      })
      .text(d => {
        return d.goalscored
      })

      svg.selectAll('texts')
        .data(datas)
        .enter()
        .append('text')
        .attr('fill','#fff')
        .attr('transform', (d,i) => {
          if(i === 0){
            return `translate(${i + 45}, ${400}) rotate (270)`
            }
            else{
              return `translate(${i * 45 + 45}, ${400}) rotate (270)`
            }
        })
        .transition()
        .duration(450)
        .delay(function(d, i) { return i * 420;})
        .attr('height', (d) => {
          return d.goalscored *2.5
        })
        .text(d => {
          return "click me"
        })

});
