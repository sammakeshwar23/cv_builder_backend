module.exports = function generateTemplate1(cv) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 30px;
            color: #333;
            background-color: #fff;
          }
          h5 {
            font-size: 24px;
            margin: 0;
            color: #2c3e50;
          }
          h6 {
            font-size: 18px;
            margin-top: 30px;
            border-bottom: 2px solid #ccc;
            color: #34495e;
          }
          p, span, div {
            margin: 0 0 6px 0;
            font-size: 14px;
          }
          .section {
            margin-bottom: 24px;
          }
          .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #ccc;
            color: white;
            font-size: 32px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
          }
          .progress {
            width: 100%;
            background-color: #eee;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 2px;
          }
          .progress-bar {
            height: 100%;
            background-color: #3f51b5;
          }
          .link {
            color: #3f51b5;
            text-decoration: none;
            font-size: 13px;
          }
          .flex-row {
            display: flex;
            gap: 16px;
            align-items: center;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="flex-row">
          <div class="avatar">
            ${ `${cv.basicDetails.name?.charAt(0) || 'A'}`}
          </div>
          <div>
            <h5>${cv.basicDetails.name || 'Your Name'}</h5>
            <p>${cv.basicDetails.email || ''}</p>
            <p>${cv.basicDetails.phone || ''}</p>
            <p>${[cv.basicDetails.address, cv.basicDetails.city, cv.basicDetails.state, cv.basicDetails.pincode].filter(Boolean).join(', ')}</p>
          </div>
        </div>

        ${cv.basicDetails.intro ? `<p>${cv.basicDetails.intro}</p>` : ''}

        ${cv.education?.length ? `
          <div class="section">
            <h6>Education</h6>
            ${cv.education.map(e => `
              <div>
                <strong>${e.degree} - ${e.institution}</strong>
                <p>${e.percentage ? `Percentage: ${e.percentage}% ` : ''}${e.year ? `(${e.year})` : ''}</p>
              </div>`).join('')}
          </div>` : ''}

        ${cv.experience?.length ? `
          <div class="section">
            <h6>Experience</h6>
            ${cv.experience.map(e => `
              <div>
                <strong>${e.position} at ${e.organization}</strong>
                <p>${[e.location, e.joiningDate, e.leavingDate || 'Present'].filter(Boolean).join(' | ')}</p>
                ${e.ctc ? `<p>CTC: ${e.ctc}</p>` : ''}
                ${e.technologies ? `<p>Technologies: ${e.technologies}</p>` : ''}
              </div>`).join('')}
          </div>` : ''}

        ${cv.projects?.length ? `
          <div class="section">
            <h6>Projects</h6>
            ${cv.projects.map(p => `
              <div>
                <strong>${p.title}</strong>
                <p>Team Size: ${p.teamSize} | Duration: ${p.duration}</p>
                ${p.technologies ? `<p>Technologies: ${p.technologies}</p>` : ''}
                ${p.description ? `<p>${p.description}</p>` : ''}
              </div>`).join('')}
          </div>` : ''}

        ${cv.skills?.length ? `
          <div class="section">
            <h6>Skills</h6>
            ${cv.skills.map(s => `
              <div>
                <span>${s.name}</span>
                <div class="progress">
                  <div class="progress-bar" style="width: ${s.proficiency || 0}%"></div>
                </div>
              </div>`).join('')}
          </div>` : ''}

        ${cv.socialProfiles?.length ? `
          <div class="section">
            <h6>Social Profiles</h6>
            ${cv.socialProfiles.map(p => `
              <p><a href="${p.link}" class="link" target="_blank">${p.link}</a></p>`).join('')}
          </div>` : ''}
      </body>
    </html>
  `;
}
