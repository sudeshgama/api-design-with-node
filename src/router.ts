import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router: Router = Router();


/**
 * Product
 */
router.post("/product",
  body('name').isString(),
  handleInputErrors,
  createProduct
);

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put("/product/:id",
  body('name').isString(), // body('name') means req.body should have property name
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);


/**
 * Update
 */
router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put("/update/:id",
  body('title').optional(),
  body('body').optional(),
  body('status').isIn([('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]).optional(),
  body('version').optional(),
  updateUpdate
);

router.post("/update",
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);

router.delete("/update ", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", (req, res) => { })
router.put("/updatepoint/:id",
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => { });
router.get("/updatepoint/:id",
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => { });
router.post("/updatepoint", () => { });
router.delete("/updatepoint ", () => { });

export default router;