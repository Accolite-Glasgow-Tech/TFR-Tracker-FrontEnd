import { TestBed } from '@angular/core/testing';
import { MilestoneDTO } from 'src/app/shared/interfaces';
import { DummyProject } from 'src/app/types/dummy-data';
import { MilestoneManagerService } from './milestone-manager.service';

fdescribe('MilestoneManagerService', () => {
  let service: MilestoneManagerService;
  let unsaveableMilestone: MilestoneDTO;
  let deletedMilestone: MilestoneDTO;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneManagerService);
    const dummyProject = DummyProject;
    service.setMilestones(DummyProject.milestones);
    unsaveableMilestone = {
      id: 1,
      project_id: 1,
      name: 'unsaveable',
      description: '',
      is_deleted: false,
      status: 'INTENT',
      possible_status: ['INTENT'],
    };
    deletedMilestone = {
      id: -2,
      project_id: 1,
      name: 'deleted',
      description: 'this milestone is deleted',
      is_deleted: true,
      start_date: new Date(),
      delivery_date: new Date(),
      acceptance_date: new Date(),
      status: 'INTENT',
      possible_status: ['INTENT'],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully determine saveability', () => {
    expect(service.isSaveable(DummyProject.milestones[0])).toBeTruthy();
    expect(service.isSaveable(unsaveableMilestone)).toBeFalsy();
  });

  describe('when deleting', () => {
    it('should only delete the requested milestone', () => {
      service.updateToRemove(DummyProject.milestones[0]);
      let expectedMilestones = DummyProject.milestones;
      expectedMilestones.shift();
      let removedMilestone = DummyProject.milestones[0];
      removedMilestone.is_deleted = true;
      expectedMilestones.push(removedMilestone);
      expect(service.getMilestones.length).toEqual(expectedMilestones.length);
      expect(service.getMilestones).toEqual(
        jasmine.arrayContaining(expectedMilestones)
      );
    });
  });

  describe('when saving,', () => {
    it("shouldn't save unsaveable milestones", () => {
      try {
        service.saveMilestone(unsaveableMilestone);
        fail("should've thrown error");
      } catch (error) {
        expect(error).toEqual(Error('bad milestone save'));
      }
    });

    it('should save over a preexisting milestone', () => {
      service.setSelected(DummyProject.milestones[0]);
      service.saveMilestone(DummyProject.milestones[0]);
      expect(service.getSelected).toEqual(null);
      expect(service.getMilestones).toEqual(
        jasmine.arrayContaining(DummyProject.milestones)
      );
      expect(service.getMilestones.length).toEqual(
        DummyProject.milestones.length
      );
    });
  });

  it('should generate temporary ids correctly', () => {
    expect(service.generateIdOfNew()).toEqual(-1);
    service.setMilestones([deletedMilestone, ...DummyProject.milestones]);
    expect(service.generateIdOfNew()).toEqual(-3);
    service.setMilestones([]);
    expect(service.generateIdOfNew()).toEqual(-1);
  });
});
