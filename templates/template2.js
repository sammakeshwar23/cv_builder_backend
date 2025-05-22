module.exports = function generateTemplate2(cv) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica Neue', sans-serif;
            margin: 0;
            background: #f4f6f8;
            color: #333;
            padding: 40px;
          }
          .container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }
          .left, .right {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            margin-bottom: 10px;
          }
          .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          h1 {
            font-size: 28px;
            margin: 0;
            color: #2c3e50;
          }
          h3 {
            margin-bottom: 10px;
            color: #00695c;
          }
          .section {
            margin-bottom: 16px;
          }
          .section p, .section div {
            margin: 4px 0;
            font-size: 14px;
          }
          .bar {
            background: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
            height: 8px;
            margin-top: 4px;
          }
          .fill {
            background: #26a69a;
            height: 100%;
          }
          a.link {
            color: #0277bd;
            font-size: 13px;
            word-break: break-all;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="left">
            <div class="avatar">
              ${`${cv.basicDetails.name?.charAt(0) || 'A'}`}
            </div>
            <h1>${cv.basicDetails.name || 'Your Name'}</h1>
            <p>${cv.basicDetails.email || ''}</p>
            <p>${cv.basicDetails.phone || ''}</p>
            <p>${[cv.basicDetails.city, cv.basicDetails.state, cv.basicDetails.pincode].filter(Boolean).join(', ')}</p>

            ${cv.skills?.length ? `
              <div class="section">
                <h3>Skills</h3>
                ${cv.skills.map(s => `
                  <div>
                    <p>${s.name}</p>
                    <div class="bar"><div class="fill" style="width: ${s.proficiency || 0}%"></div></div>
                  </div>`).join('')}
              </div>` : ''}

            ${cv.socialProfiles?.length ? `
              <div class="section">
                <h3>Social</h3>
                ${cv.socialProfiles.map(p => `<p><a href="${p.link}" class="link" target="_blank">${p.link}</a></p>`).join('')}
              </div>` : ''}
          </div>

          <div class="right">
            ${cv.basicDetails.intro ? `<div class="section"><p>${cv.basicDetails.intro}</p></div>` : ''}

            ${cv.education?.length ? `
              <div class="section">
                <h3>Education</h3>
                ${cv.education.map(e => `
                  <div>
                    <strong>${e.degree}</strong> at ${e.institution}
                    <p>${e.percentage ? `Percentage: ${e.percentage}%` : ''} ${e.year ? `(${e.year})` : ''}</p>
                  </div>`).join('')}
              </div>` : ''}

            ${cv.experience?.length ? `
              <div class="section">
                <h3>Experience</h3>
                ${cv.experience.map(e => `
                  <div>
                    <strong>${e.position}</strong> at ${e.organization}
                    <p>${[e.location, e.joiningDate, e.leavingDate || 'Present'].filter(Boolean).join(' | ')}</p>
                    ${e.ctc ? `<p>CTC: ${e.ctc}</p>` : ''}
                    ${e.technologies ? `<p>Tech: ${e.technologies}</p>` : ''}
                  </div>`).join('')}
              </div>` : ''}

            ${cv.projects?.length ? `
              <div class="section">
                <h3>Projects</h3>
                ${cv.projects.map(p => `
                  <div>
                    <strong>${p.title}</strong>
                    <p>Team Size: ${p.teamSize} | Duration: ${p.duration}</p>
                    ${p.technologies ? `<p>Tech: ${p.technologies}</p>` : ''}
                    ${p.description ? `<p>${p.description}</p>` : ''}
                  </div>`).join('')}
              </div>` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
};
