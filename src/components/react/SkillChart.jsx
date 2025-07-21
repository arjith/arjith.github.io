import React, { useEffect, useRef, useState } from 'react';

const SkillChart = ({ skillsData }) => {
  const canvasRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    
    // Set canvas size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate average skill level for each category
    const categoryAverages = skillsData.categories.map(category => ({
      ...category,
      average: category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
    }));

    // Draw radar chart
    const angles = categoryAverages.map((_, index) => (index * 2 * Math.PI) / categoryAverages.length - Math.PI / 2);
    
    // Draw grid circles
    for (let i = 1; i <= 5; i++) {
      const radius = (maxRadius / 5) * i;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw grid lines
    angles.forEach(angle => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw skill polygon
    ctx.beginPath();
    categoryAverages.forEach((category, index) => {
      const angle = angles[index];
      const radius = (category.average / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    
    // Fill the polygon
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke the polygon
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points and labels
    categoryAverages.forEach((category, index) => {
      const angle = angles[index];
      const radius = (category.average / 100) * maxRadius;
      const pointX = centerX + Math.cos(angle) * radius;
      const pointY = centerY + Math.sin(angle) * radius;
      
      // Draw point
      ctx.beginPath();
      ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#3B82F6';
      ctx.fill();
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const labelRadius = maxRadius + 25;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;
      
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Split long category names
      const words = category.name.split(' ');
      if (words.length > 2) {
        ctx.fillText(words.slice(0, 2).join(' '), labelX, labelY - 8);
        ctx.fillText(words.slice(2).join(' '), labelX, labelY + 8);
      } else {
        ctx.fillText(category.name, labelX, labelY);
      }

      // Draw percentage
      ctx.fillStyle = '#3B82F6';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText(`${Math.round(category.average)}%`, labelX, labelY + (words.length > 2 ? 20 : 12));
    });

  }, [skillsData, selectedCategory]);

  return (
    <div className="w-full">
      {/* Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            width={400}
            height={400}
            className="max-w-full h-auto bg-gray-900/30 rounded-xl border border-gray-700/30"
            style={{ width: '400px', height: '400px' }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillsData.categories.map((category, index) => {
          const average = Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length);
          
          return (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{category.name}</div>
                <div className="text-xs text-gray-400">{average}% average</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Details */}
      {selectedCategory !== null && (
        <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700/30">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{skillsData.categories[selectedCategory].icon}</span>
            <h4 className="text-xl font-bold text-white">{skillsData.categories[selectedCategory].name}</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {skillsData.categories[selectedCategory].skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white">{skill.name}</div>
                  <div className="text-xs text-gray-400">{skill.experience}</div>
                </div>
                <div className="text-blue-400 font-bold">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillChart;
