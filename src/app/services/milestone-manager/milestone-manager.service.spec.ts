import { TestBed } from '@angular/core/testing';
import { MilestoneDTO } from 'src/app/shared/interfaces';
import { DummyProject } from 'src/app/types/dummy-data';
import { MilestoneManagerService } from './milestone-manager.service';

describe('MilestoneManagerService', () => {
  let service: MilestoneManagerService;
  let unsaveableMilestone: MilestoneDTO;
  let deletedTempMilestone: MilestoneDTO;
  let noIdMilestone: MilestoneDTO;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneManagerService);
    const dummyProject = DummyProject;
    unsaveableMilestone = {
      id: 1,
      project_id: 1,
      name: 'unsaveable',
      description: '',
      is_deleted: false,
      status: 'INTENT',
      possible_status: ['INTENT'],
    };
    deletedTempMilestone = {
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
    noIdMilestone = {
      project_id: 1,
      name: 'noId',
      description: 'this milestone is deleted',
      is_deleted: true,
      start_date: new Date(),
      delivery_date: new Date(),
      acceptance_date: new Date(),
      status: 'INTENT',
      possible_status: ['INTENT'],
    };
  });

  beforeEach(() => {
    service.setMilestones(DummyProject.milestones);
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
      service.setDeleted(DummyProject.milestones[0]);
      let expectedMilestones = DummyProject.milestones;
      let removedMilestone = DummyProject.milestones[0];
      expectedMilestones.shift();
      removedMilestone.is_deleted = true;
      expectedMilestones.push(removedMilestone);
      expect(service.getMilestones.length).toEqual(expectedMilestones.length);
      expect(service.getMilestones).toEqual(
        jasmine.arrayContaining(expectedMilestones)
      );
      expect(expectedMilestones).toEqual(
        jasmine.arrayContaining(service.getMilestones)
      );
    });

    describe('throws an error for and leave data unchanged if', () => {
      it('is passed a milestone with null id', () => {
        expect(() => service.setDeleted(noIdMilestone)).toThrow(
          new Error("can't remove milestones without id's")
        );
      });
      it('is passed a milestone referencing a non existing milestone', () => {
        expect(() => service.setDeleted(deletedTempMilestone)).toThrow(
          new Error('no milestone to update')
        );
      });
    });
  });

  describe('saving', () => {
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

  describe('generating new milestones', () => {
    it('should generate temporary ids correctly', () => {
      expect(service.generateIdOfNew()).toEqual(-1);
      service.setMilestones([deletedTempMilestone, ...DummyProject.milestones]);
      expect(service.generateIdOfNew()).toEqual(-3);
      service.setMilestones([]);
      expect(service.generateIdOfNew()).toEqual(-1);
    });

    it('should create expected new milestones', () => {
      let newMilestone = {
        project_id: DummyProject.id,
        name: '',
        description: '',
        id: -1,
        is_deleted: false,
        status: 'INTENT',
        possible_status: ['INTENT'],
      };
      service.selectNewMilestone(DummyProject.id);
      expect(service.getSelected).toEqual(newMilestone);
    });
  });
});
