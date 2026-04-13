import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { ProjectCard } from './ProjectCard';
import type { ProjectData } from '@/data/projects';

interface FilteredStickyScrollStackProps {
  projects: ProjectData[];
}

export function FilteredStickyScrollStack({ projects }: FilteredStickyScrollStackProps) {
  return (
    <ScrollStack
      itemDistance={72}
      itemScale={0.03}
      itemStackDistance={20}
      stackPosition="18%"
      scaleEndPosition="12%"
      baseScale={0.91}
      className="relative w-full"
    >
      {projects.map((project) => (
        <ScrollStackItem key={project.id} itemClassName="mx-auto flex justify-center">
          <ProjectCard data={project} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
