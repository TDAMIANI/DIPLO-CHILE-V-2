export interface ModuleRecap {
  id: string;
  title: string;
  sessions: string[];
  keyConcept: string;
}

export interface ToolReference {
  name: string;
  url: string;
  description: string;
  useCase: string;
  icon?: string;
}

export interface Session {
  id: string;
  date: string;
  title: string;
  hours: number;
  theory: {
    title: string;
    points: {
      title: string;
      details: string[];
    }[];
  };
  practice: {
    title: string;
    description: string;
    scenario: string;
    teacherExplanation?: string;
    realExample: {
      context: string;
      problem: string;
      solution: string;
    };
    steps: string[];
    toolsUsed: string[];
  };
}
